import absoluteURL from '@modules/absoluteURL'

export default function openWinTab(url){
    let win = window.open("", '_blank')
    win.location = absoluteURL(url)
    win.focus();
    return win
}
