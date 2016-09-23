var pubnub = PUBNUB.init({
    publish_key: 'pub-c-dd62d128-affa-442e-9468-962e09c7ec7a',
    subscribe_key: 'sub-c-46d9ccf4-66b1-11e6-9652-0619f8945a4f',
    ssl:true,
    error: function (error) {
        console.log('Error:', error);
    }
})

