/**
 * Created by Administrator on 2017/4/2.
 */
const router = new VueRouter({
    // （缩写）相当于 routes: routes
    routes :[
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ]
})

module.export = router