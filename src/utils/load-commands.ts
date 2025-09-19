import * as fs from "node:fs";
import * as path from "node:path";
import { Command } from "../types/Command";
import { Event } from "../types/Event";

export interface LoadedCommands {
    global: Command[];
    dev: Command[];
}

export function loadCommands(): LoadedCommands {
    const basePath = path.join(__dirname, "..", "commands");

    function scan(dir: string): Command[] {
        const results: Command[] = [];
        const files = fs.readdirSync(dir, { withFileTypes: true });

        for (const file of files) {
            if (file.isDirectory()) {
                results.push(...scan(path.join(dir, file.name)));
            } else {
                const command: Command = require(path.join(dir, file.name)).default;
                if (command == undefined) {
                    console.log(`Command ${file.name} is missing a default export!`);
                    continue;
                }
                if (command.data == undefined || command.execute == undefined) {
                    console.error(`Event ${file.name} is missing required properties! (data || execute)`);
                    continue;
                }
                results.push(command);
            }
        }

        return results;
    }

    return {
        global: scan(path.join(basePath, "global")),
        dev: scan(path.join(basePath, "dev")),
    };
}

export function loadEvents(): Event[] {
    const basePath = path.join(__dirname, "..", "events");

    function scan(dir: string): Event[] {
        const results: Event[] = [];
        const files = fs.readdirSync(dir, { withFileTypes: true });

        for (const file of files) {
            if (file.isDirectory()) {
                results.push(...scan(path.join(dir, file.name)));
            } else {
                const event: Event = require(path.join(dir, file.name)).default;
                if (event.name == undefined || event.execute == undefined) {
                    console.error(`Event ${file.name} is missing required properties! (name || execute)`);
                    continue;
                }
                results.push(event);
            }
        }

        return results;
    }

    return scan(basePath);
}