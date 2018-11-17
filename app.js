let app=new Vue({
    el:"#app",
    data:{
        products:[],
        url:"http://localhost:3000/products"
    },
    created:function () {
        this.products=fetch("http://localhost:3000/products",
            {method:"GET"})
            .then(data=>data.json())
            .then(data=>this.products=data);
    },
    methods:{
        test1:function () {
          let m=`hello`;
          console.log(tag`hello`);
        },
      deleteProduct:function (p) {
          fetch(this.url+"/"+p.id,{
              method:"DELETE"
          }).then(response=>{
              let index=this.products.indexOf(p);
              this.products.splice(index,1);
          })
      },
        addProduct:function () {
            let p={name:this.$refs.name.value,quantity:this.$refs.quantity.value,price:this.$refs.price.value};

            //一次添加请求及回调处理
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            fetch(this.url,
                {method:"POST",
                    headers: myHeaders,
                    body:JSON.stringify(p)})
                .then(response=>response.json())
                .then(newProduct=>this.products.push(newProduct));
        },
        updateProduct:function (p) {
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            fetch(this.url+"/"+p.id,{
                method:"PUT",headers:myHeaders,
                body:JSON.stringify(p)
            });
        }
    },
    computed:{
        total:function () {
            return this.products.reduce((sum,p)=>sum+p.quantity*p.price,0);
        }
    }
})