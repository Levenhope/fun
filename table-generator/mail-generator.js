const table = document.querySelector('.theTable tbody');
const controlsContainer = document.createElement('div');
const addSetButton = document.createElement('button');
const addImgButton = document.createElement('input');

function addTitleRow(titleRow) {
    let editedTitle = titleRow.replace("\t", ".&nbsp;");
    table.insertAdjacentHTML(
        "beforeend",
        `<tr>
            <th colspan="4" style="padding: 24px 0 12px 0;font: 18px/18px Arial,Verdana; font-weight: bold; text-align: left;" valign="top">
                ${editedTitle}
            </th>
        </tr>`);
}

function addBrakeRow() {
    table.insertAdjacentHTML(
        "beforeend",
        `<tr>
            <td colspan="3" style="padding-bottom: 4px; font-size: 0; line-height: 0;"></td>
        </tr>`);
}

function addSet(set) {
    set.forEach((item) => {
        const nameFormat = item.link
            ? `<a target="_blank" style="color:#2D2D2D;" href="${item.link}">
                        <span class="link-hover-text">
                            ${item.name}
                        </span>
                    </a>`
            : `${item.name}`;
       table.insertAdjacentHTML("beforeend",
           `<tr>
                <td valign="top">
                    ${nameFormat}
                </td>
                <td valign="top">
                    ${item.source}
                </td>
                <td valign="top">
                    ${item.creator}
                </td>
            </tr>`);
    });
}

function parseExcel() {
    let setToken = prompt('Сетка', '');
    let sets = setToken.split("\r\n\t\t\t\r\n\t\t\t\r\n");

    sets.forEach((set, index) => {
        let subSets = set.split("\r\n\t\t\t\r\n");
        subSets.forEach((subSet, subIndex) => {
            let rows = subSet.split("\r\n");
            let setArray = [];
            if (subIndex === 0) {
                let titleRow = subSet.split("\t\t\r\n")[0];
                addTitleRow(titleRow);
            }
            rows.forEach((row, rowIndex) => {
                if (subIndex === 0 && rowIndex === 0) return;

                let celledRow = row.split("\t");
                let setItem = {
                    link: celledRow[0],
                    name: celledRow[1],
                    source: celledRow[2],
                    creator: celledRow[3],
                };
                setArray.push(setItem);
            });

            addSet(setArray);

            if (index < sets.length + 1) {
                addBrakeRow();
            }
        });
    });
}

async function uploadImage(img)
{
    var form = new FormData();
    form.append('image', img)

    var url = 'https://api.imgbb.com/1/upload?key=8f754d0cf7d69497770632e39ed0b28b'

    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
        },
        body: form
    }

    const response = await fetch(url, config)
    const json = await response.json()

    console.log(response)
}

addSetButton.textContent = "Добавить сетку";
addSetButton.classList.add('addTableBtn');
addImgButton.type = "file";
addImgButton.accept = "image/*";
addImgButton.classList.add('addImgBtn');
controlsContainer.classList.add('controls');
controlsContainer.append(addImgButton);
controlsContainer.append(addSetButton);
document.body.append(controlsContainer);
addSetButton.addEventListener('click', function() {
    parseExcel();
});
addImgButton.addEventListener('change', function() {
    uploadImage();
});
document.addEventListener('keydown', function(e) {
    if (e.code === 'KeyP') {
        parseExcel();
    }
});


