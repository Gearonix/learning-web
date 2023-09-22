const fileBtn = document.querySelector('#file-btn');
const fileTextarea = document.querySelector('#file-textarea');
const fileSaveBtn = document.querySelector('#file-save-btn')
const fileSaveAsBtn = document.querySelector('#file-save-as-btn')

let fileHandle;

fileBtn.addEventListener('click', async () => {
    [fileHandle] = await window.showOpenFilePicker();
    const fileData = await fileHandle.getFile();
    const fileText = await fileData.text()
    fileTextarea.value = fileText
    console.log(fileText)
})

const save = async () => {
    const stream = await fileHandle.createWritable();
    console.log(fileTextarea.value)
    await stream.write(fileTextarea.value);
    await stream.close()
}

fileSaveBtn.addEventListener('click', save)

fileSaveAsBtn.addEventListener('click', async () => {
    fileHandle = await window.showSaveFilePicker();
    save()
})
