from playwright.sync_api import sync_playwright

def verify_registration_page(page):
    page.goto('http://localhost:5173')

    # Fill in the demographics page to enable the "Next" button
    page.fill('input[name="fullName"]', 'Jules')
    page.fill('input[name="age"]', '30')
    page.select_option('select[name="gender"]', 'Female')

    page.click('button:text("Next")')

    page.screenshot(path='registration_page.png', full_page=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    verify_registration_page(page)
    browser.close()
