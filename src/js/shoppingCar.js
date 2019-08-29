import '../css/shopping.scss';
import  Header from '../components/header/index'
import  ListItem from '../components/shoppingCar/list_item/index'
import  { ShoppingCarModel } from '../modues/shopping.js'
import PurchaseBox from '../components/shoppingCar/purchase_box/index';

const  header = Header(),
       listItem = ListItem(),
       purchaseBox = PurchaseBox(),
       shoppingCarModel = new ShoppingCarModel();
       console.log(shoppingCarModel);
       console.log(shoppingCarModel.getGoodsDetail(1));
const doms = {
    oMainCheck: null,
    oSubChecks: null,
    oEditBtn: null,
    oPurchaseBtn: null, 
    oPurchaseBox: null,
    oTotal: null
}
const APP = (doc)=>{
    /** 前端做缓存用的，删除是先统一删除前端的，最后一次性给后端*/
    let cartInfos = {
        list: [],
        total: 0
      }
    let oContainer = doc.getElementsByClassName('J_container')[0],
        oJlist = doc.getElementsByClassName('J_list')[0];
    const init =  ()=>{
       
        
        shoppingCarModel.getGoodsDetail(1).then((res)=>{
            console.log(res);
            cartInfos.total = res.total_price;
            cartInfos.list = res.res;
            if(res.res) {
                oJlist.innerHTML = listItem.makeList(cartInfos.list);
                oContainer.appendChild(purchaseBox.tpl(cartInfos.total));
            }
            else{
                oJlist.innerHTML = '没有数据了';
            }
        }).then(()=>{
            oContainer.appendChild(header.tpl('购物车详情',true,'编辑'));
    	    bindEvent(document);
        })
    }
    const bindEvent = (doc)=>{
        console.log('bindOk');
        
        doms.oPurchaseBox = doc.getElementsByClassName('purchase-box')[0];
        doms.oMainCheck  = doc.getElementsByClassName('J_mainCheck')[0];
        doms.oTotal = oContainer.getElementsByClassName('J_totalPrice')[0];
        doms.oSubChecks = doc.getElementsByClassName('J_subCheck');
        doms.oEditBtn = doc.getElementsByClassName('J_editItem')[0];

        oContainer.addEventListener('click',toDoEavent,false);
        doms.oEditBtn.addEventListener('click', header.onEditBtn, false);
    }
    const toDoEavent = (e)=>{
        
        console.log('bindOk111');
        listItem.listEvent(e).then((res) => {
            console.log(res);
            if('allCheckBox' === res.field){
                cartInfos.list.forEach(elem=>{
                    elem.checked = true;
                });
                reComputeTotal();
            }else if (res !== -1) {
            let item = cartInfos.list[res.idx];
            console.log(item);
            console.log('zhuyi');
            switch (res.field) {
            case 'numSelector':
                numOperation(item, res);
                break;
            case 'checkBox':
                itemCheck(item, res);
                break;
            case 'remove':
                removeItem((cartInfos.list.length-1));
            default:
                break;
            }
    
        }else{

        } 
        })
    }
    const numOperation = (item, data) => {
        console.log('num');
        item.num = data.num;
        item.total_price = data.num * item.price;
        doms.oSubChecks[data.idx].checked = true;
        doms.oMainCheck.checked = true;
        cartInfos.list[data.idx].checked = true;
        reComputeTotal();
    }

    const itemCheck = (item, data) => {
        console.log('itemcheck');
        console.log(item.checked);
        console.log(item.checked);
    item.checked = data.checked;
    reComputeTotal();
    }
    const removeItem = (index) => {
        console.log('rem');
        cartInfos.list.splice(index, 1);
        console.log(cartInfos.list);
        if (cartInfos.list.length > 0) {
          reComputeTotal();
        } else {
          doms.oPurchaseBox.remove();
          oJlist.innerHTML = '没有数据了';//noListTip.tpl();
        }
      }
    
    const reComputeTotal = (doZero) => {
    cartInfos.total = 0;
    if (doZero) {
        doms.oTotal.innerHTML = 0;
        return;
    }

    cartInfos.list.forEach((elem) => {
        if (elem.checked) {
        cartInfos.total += Number(elem.total_price);
        }
    });

    console.log(cartInfos.list);
    
console.log(cartInfos.total);
    doms.oTotal.innerHTML = cartInfos.total;
    }
    
    init();
};

APP(document);