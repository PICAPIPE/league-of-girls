var ROLES_STANDARD = ['User'];

var DB_SERVICES    = [

    // Status

    {
       'name' : 'Status',
       'url'  : 'api/status',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'get',
               name:       'check',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url
               }
           }
       ]

    },

    // Users

    {
       'name' : 'Users',
       'url'  : 'api/users',
       'custom': [
           {
               type:       'post',
               name:       'request',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/:uuid/request'
               }
           }
       ]
    },

    // Current User

    {
       'name' : 'CurrentUser',
       'url'  : 'api/users',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'get',
               name:       'check',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current'
               }
           },
           {
               type:       'put',
               name:       'save',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current'
               }
           },
           {
               type:       'post',
               name:       'addGame',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/games'
               }
           },
           {
               type:       'post',
               name:       'addPlattform',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/plattforms'
               }
           },
           {
               type:       'post',
               name:       'addCommunication',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/communications'
               }
           },
           {
               type:       'post',
               name:       'addLink',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/links'
               }
           }
       ]

    },

    // Authentication

    {
       'name' : 'Auth',
       'url'  : 'api/auth',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'post',
               name:       'login',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/login'
               }
           },
           {
               type:       'post',
               name:       'register',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/register'
               }
           },
           {
               type:       'post',
               name:       'reset',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/reset'
               }
           }
       ]

    },

    // Plattforms

    {
       'name' : 'Plattforms',
       'url'  : 'api/plattforms'
    },

    // Communications

    {
       'name' : 'Communications',
       'url'  : 'api/communications'
    },

    // Links

    {
       'name' : 'Links',
       'url'  : 'api/links'
    }

];
