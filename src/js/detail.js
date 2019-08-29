import '../css/index.scss';
import {DetailModel} from '../modues/detail'
import utils from '../utils/utils.js'
import Img from '../components/detail/imgWarp/index'
import Text from '../components/detail/text/index'
import Buy from '../components/detail/buy/index'
console.log(Img);
console.log(Text);
const img =  Img();
const text = Text();
const buy =  Buy();
console.log(img);

const detailModel = new DetailModel();
const App = (doc)=>{
    const oContainer = doc.getElementsByClassName('J_container')[0];
    const init = ()=>{
        
        detailModel.getGoodsDetail(utils.getUrlQueryValue('id')).then(
            (res)=>{
            let list ='';
            console.log(res); 

    
                list += img.tpl().replace(/{{(.*?)}}/g,(node,key)=>{
                    return{
                        imgSrc:res.img_url,
                    }[key]   
                }) ;
                list += text.tpl().replace(/{{(.*?)}}/g,(node,key)=>{
                    return{
                        title:res.goods_name,
                        price:res.price,
                        m_sales:res.m_sales,
                    }[key]   
                })  ;
                list += buy.tpl().replace(/{{(.*?)}}/g,(node,key)=>{
                    return{
                        number:res.comment_num,
                        title:'加入购物车',
                        buy:'立即购买',
                        id:res.id,
                    }[key]   
                })  ;
            oContainer.innerHTML = list;
        }).then(()=>{
            buy.init();
        });
        
    }
    init();
}

App(document);