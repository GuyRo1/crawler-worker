import * as cheerio from 'cheerio';

export type GetLinksFromPage = (data: any) => string[]

export const getLinksFromPage: GetLinksFromPage = (data) => {
    const $: cheerio.CheerioAPI = cheerio.load(data)
    const linksObj: cheerio.Cheerio<cheerio.Element> = $('a')
    const resultLinks: string[] = []
    linksObj.each((i: number, elm: cheerio.Element) => {
        const link: string | undefined = $(elm).attr()?.href
        if (link) resultLinks.push(link)
    })
    return resultLinks
}