import { TextChannel, BaseChannel } from "discord.js";

export type MarkedMessage = {
    type: "message";
    channel_id: string;
    message_id: string;
}

export type MarkedBaseChannel = {
    type: "channel";
    channel_id: string;
}

export default class MarkedForDeletion {
    static MARKED_TO_DELETE: (MarkedMessage | MarkedBaseChannel)[] = [];

    static markMessage(channel_id: string, message_id: string) { MarkedForDeletion.MARKED_TO_DELETE.push({ channel_id, message_id, type: "message" } as MarkedMessage); }
    static markChannel(channel_id: string) { MarkedForDeletion.MARKED_TO_DELETE.push({ channel_id, type: "channel" } as MarkedBaseChannel); }

    private static _intervalTime: number = 5;
    static set timeToClear(new_time: number) {
        MarkedForDeletion._intervalTime = new_time;
        clearInterval(MarkedForDeletion.interval);
        MarkedForDeletion.interval = setInterval(MarkedForDeletion.clear, MarkedForDeletion._intervalTime * (60 * 1000));
    }
    static interval: NodeJS.Timeout;

    static async clear() {
        // console.log("Attempting to delete marked for deletion items!");
        if (MarkedForDeletion.MARKED_TO_DELETE == undefined) MarkedForDeletion.MARKED_TO_DELETE = [];
        for (const item of MarkedForDeletion.MARKED_TO_DELETE) {
            switch (item.type) {
                case "message":
                    // console.log(`Attempting to delete message ${item.message_id} in channel ${item.channel_id}`);

                    const message_channel = (await client.channels.fetch(item.channel_id)) as TextChannel;
                    if (message_channel == undefined) continue;

                    message_channel.messages.fetch(item.message_id).then(msg => msg.delete());
                    break;
                case "channel":
                    // console.log(`Attempting to delete channel ${item.channel_id}`);
                    
                    const base_channel = (await client.channels.fetch(item.channel_id)) as BaseChannel;
                    if (base_channel == undefined) continue;
                    base_channel.delete();
                    break;
            }
        }
        MarkedForDeletion.MARKED_TO_DELETE = [];
    }
}