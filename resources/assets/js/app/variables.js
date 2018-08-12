var ROLES_STANDARD = ['User'];

var CONST          = {
    colors: {
       pages: 'rgba(175, 175, 175,0.8)'
    }
};

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
           },
           {
               type:       'get',
               name:       'friendRequests',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/requests'
               }
           },
           {
               type:       'get',
               name:       'chats',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/chats'
               }
           },
           {
               type:       'get',
               name:       'export',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/export'
               }
           },
           {
               type:       'get',
               name:       'deleteAccount',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/delete-account'
               }
           },
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

    // Friend requests

    {
       'name' : 'FriendRequests',
       'url'  : 'api/friends-requests',
       'except': ['all','get','show','store']
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
    },

    // FAQ

    {
       'name' : 'Faq',
       'url'  : 'api/faq'
    },

    // Chats

    {
       'name' : 'Chats',
       'url'  : 'api/chats',
       'except': ['all','show'],
       'custom': [
           {
               type:       'get',
               name:       'deleteMessages',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/:uuid/delete-messages'
               }
           },
           {
               type:       'get',
               name:       'exportMessages',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/:uuid/export'
               }
           }
        ]
    },

    {
       'name' : 'Messages',
       'url'  : 'api/messages',
       'except': ['all','show','create'],
       'custom': [
           {
               type:       'post',
               name:       'report',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/:uuid/report'
               }
           }
        ]
    },

    // Streams

    {
       'name' : 'Streams',
       'url'  : 'api/streams',
       'custom': [
           {
               type:       'get',
               name:       'featured',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/featured'
               }
           }
       ]
    },

    // Pages

    {
       'name' : 'Pages',
       'url'  : 'api/pages',
       'custom': [
         {
             type:       'get',
             name:       'view',
             queryIndex: 2,
             dataIndex:  3,
             keep:       true,
             getUrl: function(url)
             {
                 return url + '/views/:id'
             }
         }
       ]
    },

    // Pages Elements

    {
       'name' : 'Elements',
       'url'  : 'api/elements',
       'custom': []
    }

];
