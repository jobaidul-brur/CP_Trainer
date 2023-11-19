const puppeteer = require("puppeteer");
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ScrapProblem = async (link: string) => {
    const browser = await puppeteer.launch({ headless: false });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto(link);
    const [e1] = await page.$x(
      '//*[@id="pageContent"]/div[3]/div[2]/div/div[3]'
    );
    console.log(e1);
    const src = await e1.getProperty("html");
    const srcTxt = await src.jsonValue();
    await page.waitForTimeout(3000);
    browser.close();
    return srcTxt;
  };
  const link = "https://codeforces.com/problemset/problem/1899/G";

  return NextResponse.json(await ScrapProblem(link), { status: 200 });
}
