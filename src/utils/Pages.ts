import { ContainerBuilder, SeparatorSpacingSize, Collection } from "discord.js";
import { MathUtil } from "./MathUtil";

export type SectionData = {
    texts: string[];
    // buttons: any[];
    // thumbnail: string | undefined;
}

export type PageData = {
    texts: string[];
    seperator: SeparatorSpacingSize | undefined;
    sections: SectionData[] | undefined;
}

export class PageInformation {
    color: number = DEFAULT_CONTAINER_COLOR;
    setColor(color:number) { this.color = color; return this; }

    title: string = "";
    setTitle(title:string) { this.title = title; return this; }
    
    description: string = "";
    setDescription(description:string) { this.description = description; return this; }

    _data: PageData[] = [];
    add(texts: string[], seperator?: SeparatorSpacingSize | undefined, sections?: SectionData[] | undefined) {
        this._data.push({ texts, seperator, sections, });
        return this;
    }

    constructor() {
        this._data = [];
    }
    
}

export type CachedPage = {
    page: Pages;
    message_id: string;
}

export class Pages {

    static CACHED_PAGES = new Collection<string, CachedPage>();

    private _currentPage: number;
    public get currentPage():number { return this._currentPage; }
    public set currentPage(value:number) {
        this._currentPage = MathUtil.wrap(value, 0, this.data.length - 1);
    }

    data: PageInformation[];
    private _maxPages: number = 0;
    public get maxPages():number { return this.data.length; }
    constructor() {
        this._currentPage = 0;
        this.data = [];
    }

    add(data: PageInformation) {
        this.data.push(data);
    }

    build():ContainerBuilder | undefined {
        const current_data = this.data[this.currentPage];
        if (current_data == undefined) return;
        const container = new ContainerBuilder();

        container.addTextDisplayComponents(_ => _.setContent(current_data.title), _ => _.setContent(current_data.description));
        container.addSeparatorComponents(_ => _.setSpacing(SeparatorSpacingSize.Large));

        for (const data of current_data._data) {
            for (const text of data.texts) container.addTextDisplayComponents(_ => _.setContent(text));
            if (data.seperator != undefined) {
                const what = data.seperator; // fixes type error because fuck you
                container.addSeparatorComponents(_ => _.setSpacing(what));
            }
            for (const section of data.sections ?? []) {
                for (const text of section.texts) container.addTextDisplayComponents(_ => _.setContent(text));
                // todo: add support for literally everything else
            }
        }

        return container;
    }

    next() {
        this.currentPage++;
    }

    prev() {
        this.currentPage--;
    }
}