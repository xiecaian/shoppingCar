//数据层
import { HTTP } from '../utils/http'
import { resolve } from 'url';
import { reject } from 'q';

class IndexModel extends HTTP{
    //继承HTTP
    getGoodsList(tpl){
        return new Promise((resolve,reject)=>{
            this.ajax({
                url:'Shopping_cart/getGoodsList',
                type:'POST',
                dataType:'JSON',
                success(data){
                    let list = '';
                    console.log(data);
                    data.forEach(elem => {
                        list += tpl().replace(/{{(.*?)}}/g,(node,key)=>{
                            return{
                                id:elem.id,
                                imgUrl:elem.img_url,
                                good_name:elem.id,
                                title:elem.goods_name,
                                price:elem.price,
                            }[key]
                        })
                    });
                    resolve(list);
                }
            })
        })
    }
}

export {IndexModel};