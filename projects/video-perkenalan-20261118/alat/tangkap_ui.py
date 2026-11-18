# tangkap_ui.py <outdir> : tangkap UI asli (desktop 1440x900 @2x, mobile 390x844 @3x) dari halaman publik.
import sys, asyncio
from playwright.async_api import async_playwright

OUT = sys.argv[1]
DESKTOP = [
    ('workspace', 'https://workspace.jadisatu.cloud'),
    ('canvas', 'https://canvas.jadisatu.cloud'),
    ('greatstock', 'https://greatstock.jadisatu.cloud'),
    ('tuntunly', 'https://tuntunly.com'),
    ('github_skilldev', 'https://github.com/Siirfannih/skill-development'),
    ('jadisatu', 'https://jadisatu.cloud'),
]
MOBILE = [('ig_profil', 'https://www.instagram.com/siirfannih/')]


async def shot(p, name, url, mobile):
    b = await p.chromium.launch()
    if mobile:
        ctx = await b.new_context(**p.devices['iPhone 13'], locale='id-ID', color_scheme='light')
    else:
        ctx = await b.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=2, locale='id-ID', color_scheme='light')
    pg = await ctx.new_page()
    try:
        r = await pg.goto(url, wait_until='networkidle', timeout=45000)
        await pg.wait_for_timeout(2500)
        await pg.screenshot(path=f'{OUT}/{name}.png')
        print(name, r.status if r else '-', pg.url, (await pg.title())[:80])
    except Exception as e:
        print(name, 'GAGAL', str(e)[:120])
    await b.close()


async def main():
    async with async_playwright() as p:
        await asyncio.gather(*[shot(p, n, u, False) for n, u in DESKTOP], *[shot(p, n, u, True) for n, u in MOBILE])

asyncio.run(main())
