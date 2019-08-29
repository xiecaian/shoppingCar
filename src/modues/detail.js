//数据层
import { HTTP } from '../utils/http';

class DetailModel extends HTTP{
    //继承HTTP
    getGoodsDetail(id){
        return new Promise((resolve,reject)=>{
            this.ajax({
                url:'ShoppingCart/getGoodsDetail',
                type:'POST',
                dataType:'JSON',
                data:{
                    id:id,
                },
                success(data){              
                    console.log(data);           
                    resolve(data);
                }
            })
        })
    };
    updateShoppingCart (gid) {
        return new Promise((resolve, reject) => {
            this.ajax({
            url: 'ShoppingCart/updateShoppingCart',
            type: 'POST',
            dataType: 'JSON',
            data: {
                uid: 1,
                goodsId: gid
            },
            success (data) {
                resolve(data.error_code);
            }
        })
    })
  };
}

export {DetailModel};