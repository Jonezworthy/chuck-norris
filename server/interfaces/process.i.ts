export interface Process {
    exit(arg0: number): any;
    db: any;
    env: any;
    handlebars: any;
    cheerio: any;
    pdf: any;
    nextTick: Function;
    NODE_ENV: string;
    browser: any;
}