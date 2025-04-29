import {fetchPlaceholders, getMetadata} from '../../scripts/aem.js';

async function getTraslations() {
    const locale = getMetadata("locale");
    const placeholders = await fetchPlaceholders(locale);
    console.log(placeholders);
}


export default function decorate(block) {
    
    const getFirstField = row => {
        const start_column = 1;
        const relevancy_size = 2;
        for(let i=start_column;i<=relevancy_size;i++){
            if(row.children[i].textContent !== ""){
                return row.children[i].textContent;
            }
        }
        return 0;
    }

    const div = document.createElement('div');
    let count = 0;
    let helperObj = [];
    [...block.children].forEach((row) => {
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = row.children[0].textContent + " : " + getFirstField(row);

        helperObj[count++] = {
            title: row.children[0].textContent,
            link: getFirstField(row),
            };

        div.append(tempDiv);
    });
    block.textContent = '';
    block.append(div);
    console.log(helperObj);
    getTraslations();
}
