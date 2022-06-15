
import { addResumeDetails, deleteResumeDetails, updateResumeDetails } from './action'
import { isNull, checkVal } from '../RegClass'
import { EditorState, ContentState } from "draft-js";

export const disabledHandler = (isDisabled, propsElemId) => {
    const colorValue = isDisabled ? 'rgba(137, 152, 163, 0.099)' : 'white'
    if (propsElemId) {
        const wrapper = document.getElementById(propsElemId)
        wrapper.querySelector('.rdw-editor-toolbar').style.background = colorValue
        const btnelem = [...wrapper.querySelectorAll('.rdw-option-wrapper')]

        btnelem.map(btn => {
            if (isDisabled) { btn.classList.add("rdw-option-disabled") }
            else { btn.classList.remove("rdw-option-disabled") }
        })
    }
    else {
        const recordWrap = document.getElementById('xp-record-wrap-temp2')

        const toolBar = [...recordWrap.querySelectorAll('.rdw-editor-toolbar')]
        toolBar.map(toolVal => { toolVal.style.background = colorValue })

        const btnelem = [...recordWrap.querySelectorAll('.rdw-option-wrapper')]

        btnelem.map(btn => {
            if (isDisabled) { btn.classList.add("rdw-option-disabled") }
            else { btn.classList.remove("rdw-option-disabled") }
        })
    }
}


const requiredFeilds = ['First Name', 'Last Name', 'Phone Number', 'Email', 'Title', 'Employer', 'Start Date', 'End Date', 'Summary',
    'School Name', 'Course', 'Skill Name']

export async function onClickAdd(heading, ID, selectorId, editorState, setEditorState) {
    const wrap = document.querySelector('#' + selectorId)
    const inps = [...wrap.querySelectorAll(['input', 'textarea'])]
    const ExpVal = []
    let ret = false
    inps.map(i => {

        if (requiredFeilds.includes(i.name)) {
            if (checkNull(i)) { ret = true }
        }
        if (i.name == 'Skill Level') { if (checkSkill(i)) { ret = true } }


        if (i.type == 'radio') {
            if (i.checked == true) {
                ExpVal.push({ 'name': 'head', 'val': i.value })
            }
        }
        else {
            ExpVal.push({ 'name': i.name, 'val': i.value })

        }
    })
    if (heading == 'Experience') {
        if (editorState && editorState.getCurrentContent().hasText()) {
            document.querySelector("[data-editor='toolbarEditor']").classList.remove('error')
            ExpVal.push({ 'name': 'Summary', 'val': EditorState.createWithContent(editorState.getCurrentContent()) })
        }
        else {
            document.querySelector('[data-editor="toolbarEditor"]').classList.add('error')
            ret = true
        }
    }

    if (ret) {
        showErrorMsg(heading, true)
        return
    }
    else {
        showErrorMsg(heading, false)
        if (heading == 'Experience') {
            const emptyState = EditorState.push(editorState, ContentState.createFromText(''))
            setEditorState(emptyState)
        }
        inps.map(i => heading == 'Experience' && i.name == 'Summary' ? i.value = editorState.CreateEmpty() : i.value = '')
        ExpVal.push({ 'name': 'id', 'val': ID })
        if (heading == 'Summary' || heading == 'Personal') {
            wrap.style.display = 'none'
        }
        return ExpVal
    }

}
export function onClickEdit(elementBlockId, setDisableVal) {

    const element = document.querySelector('#' + elementBlockId)
    const formElem = [...element.querySelectorAll('.form-control')]

    formElem.map(i => {
        i.toggleAttribute('disabled')

    })

    if (elementBlockId.includes('Experience')) {
        const disVal = formElem[0].hasAttribute('disabled')
        setDisableVal(disVal)
        disabledHandler(disVal, elementBlockId)
    }

}
export async function onClickSave(uuId, elementBlockId, head, inpArray2, setDisableVal, recordSum) {
    let resumeIndex;

    const ExpVal = []
    let ret = false
    const element = document.querySelector('#' + elementBlockId)

    const formElem = [...element.querySelectorAll('.form-control')]
    formElem.map(i => {
        if (requiredFeilds.includes(i.name)) {
            if (checkNull(i)) { ret = true }
        }
        if (i.name == 'Skill Level') { if (checkSkill(i)) { ret = true } }

        ExpVal.push({ 'name': i.name, 'val': i.value })
    })

    if (ret) { return }
    else {
        if (elementBlockId.includes('Experience')) {
            const summaryElement = element.querySelector('[data-editor="toolbarEditor"]')
            console.log(summaryElement,)
            if (recordSum.getCurrentContent().hasText()) {
                summaryElement.classList.remove('error')
                ExpVal.push({ 'name': 'Summary', 'val': recordSum })
            }
            else {
                summaryElement.classList.add('error')
                return
            }

        }
        ExpVal.push({ 'name': 'id', 'val': uuId.val })
        inpArray2.map((i, index) => {
            if (i.slice(-1)[0].val == uuId.val) {
                resumeIndex = index
            }
        })

        onClickEdit(elementBlockId, setDisableVal)
        return [ExpVal, resumeIndex]
    }
}
export async function onClickDelete(uuId, inpArray, head) {
    const ExpVal = Object.assign([], inpArray)
    const newArr = ExpVal.filter(i => i.slice(-1)[0].val != uuId.val)

    if (newArr == undefined) {
        return []
    }
    else {
        return newArr
    }

}
export const onClickEvent = (key, uuid, clname, dispatch, editorState, setEditorState) => {

    const i = onClickAdd(key, uuid, clname, editorState, setEditorState)
    i.then(value => value != undefined ? dispatch(addResumeDetails(key, value)) : ''
    ).catch(
        new Error("No value provided")
    )
}
export const radioClickState = (setType, e) => {
    setType(e.target.id)
}
export function handleClickXpDown(gidName, icon) {
    const element = document.querySelector('#' + gidName)
    const IconElement = document.querySelector('#' + icon)
    const HideIconClassElem = [...IconElement.querySelectorAll('.record-icon-wrap-hide')]
    if (element.style.display == 'none') {
        element.style.display = 'grid'
        element.style.animation = 'fadeInDown 0.5s'
        HideIconClassElem.map(i => { i.style.display = 'flex' })
    }
    else {
        element.style.animation = 'fadeInUp 0.1s'
        element.style.display = 'none'
        HideIconClassElem.map(i => { i.style.display = 'none' })
    }

}
export const onClickDeleteEvent = (UUIDobj, inpArray, head, dispatch) => {
    const res = onClickDelete(UUIDobj, inpArray, head)
    res.then(value => {
        dispatch(deleteResumeDetails(head, value))
    })

}
export const onClickSaveEvent = (UUIDobj, blockGridId, head, inpArray2, dispatch, setDisableVal, recordSum) => {
    const res = onClickSave(UUIDobj, blockGridId, head, inpArray2, setDisableVal, recordSum)

    res.then(value => value != undefined ?
        dispatch(updateResumeDetails(head, value))
        : ''
    ).catch(er =>
        new Error("Error on line 207 promise ", er)
    )
}
export const showErrorMsg = (heading, val) => {
    val ? document.getElementById(heading + '-error-wrap').style.display = 'flex' :
        document.getElementById(heading + '-error-wrap').style.display = 'none'
}
export const checkNull = (i) => {
    let ret = false;

    if (isNull(i.value)) {
        i.classList.add('error')
        ret = true
    }
    else if (isNull(i.value) == false && i.classList.contains('error')) {
        i.classList.remove('error')
    }
    return ret
}
export const checkSkill = (i) => {
    let ret = false;
    if (checkVal(i.value) != true) {
        i.classList.add('error')
        ret = true
    }
    else if (checkVal(i.value) == true && i.classList.contains('error')) {
        i.classList.remove('error')
    }
    return ret
}