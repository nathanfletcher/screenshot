const puppeteer = require('puppeteer');

let browser;
let page;

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.screenshot = async (req, res) => {
    const url = req.query.url;
    const json = req.query.json || false;
    const filename = req.query.reportID ? `report-${req.query.reportID}.pdf` : `report-${Math.random()*100}.pdf`

    if (!url) {
      return res.send('Please provide URL as GET parameter, for example: <a href="?url=https://example.com">?url=https://example.com</a>');
    }

    const width = req.query.width ? parseInt(req.query.width, 10) : 1280;
    const height = req.query.height ? parseInt(req.query.height, 10) : 800;
  
    if(!browser) {
        browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
    }
    if(!page) {
        page = await browser.newPage();
    }

    await page.setViewport({width, height});
    await page.goto(url);
    
    const imageBuffer = await page.pdf({path: "files/"+filename, format: 'A4'});
    
    if(json){
        res.json({downloadUrl : `${process.env.SITE_URL}/${filename}`})
    }
    else{
        res.set('Content-Type', 'application/pdf');
        res.send(imageBuffer);
    }
    
  };
  