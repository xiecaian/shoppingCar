import scss from '../css/index.scss'
import Header from '../components/header/index'
import listItem from '../components/homePage/list_item/index'
import {IndexModel} from '../modues/modules.js'
const header = Header();
const Indexmodel = new IndexModel();
const listitem = listItem();     
const App = (doc) =>{
    const oContainer = doc.getElementsByClassName('J_container')[0],
            oList = doc.getElementsByClassName('J_list')[0];

    const init = ()=>{
        console.log(oContainer);
        oContainer.appendChild(header.tpl('商品列表',false));
        console.log(Indexmodel);
        console.log(Indexmodel.getGoodsList);
        console.log(Indexmodel.getGoodsList(listitem.tpl));
        console.log(listitem.tpl);
        Indexmodel.getGoodsList(listitem.tpl).then((list)=>{
            oList.innerHTML = list;
        })
    }
    init();
};

 App(document);

