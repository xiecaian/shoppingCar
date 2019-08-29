function getUrlQueryValue(key){
    const reg = new RegExp('(^|&)'+ key +'=([^&]*)(&|$)','i')
    const res = window.location.search.substr(1).match(reg); 
    return res != null ? decodeURIComponent(res[2]) : null;
}

export default{
    getUrlQueryValue 
}