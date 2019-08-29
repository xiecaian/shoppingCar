import tpl from './index.tpl'
import './index.scss'
import {DetailModel} from '../../../modues/detail'
import toast from '../../toast/index'
const detailModel = new DetailModel();
const toshoppingCar =  toast();
 export default ()=>{
     return {
        name: 'btnBox',
        tpl,
        init(){
            this.oAddToCart = document.getElementsByClassName('J_addToCar')[0];
            console.log(this.oAddToCart);
            this.bindEvent();
        },
        bindEvent(){  
            let self = this,
                toDoJionShoppingCar = this.toJionShoppingCar.bind(self);    
            this.oAddToCart.addEventListener('click',toDoJionShoppingCar,false);
        },
        toJionShoppingCar(e){
            console.log(detailModel);
            console.log(this.toGetId(this.oAddToCart));
            detailModel.updateShoppingCart(this.toGetId(this.oAddToCart)).then((code)=>{
                switch (code) {
                    case '1001':
                      window.location.href = 'index.html';
                      break;
                    case '1002':
                        toshoppingCar.showToast({
                        icon: 'warning',
                        title: '添加失败',
                        duration: 1500
                      });
                      break;
                    case '1003':
                        toshoppingCar.showToast({
                        icon: 'warning',
                        title: '已达上限',
                        duration: 1500
                      });
                      break;
                    case '200':
                        toshoppingCar.showToast({
                        title: '添加成功',
                        duration: 1500
                      });
                      break;
                    default:
                      break;
                }
            })
        },
        toGetId(elem){
             return elem.getAttribute('data-id');
        },
     }
 }