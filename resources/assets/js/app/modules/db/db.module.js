appConfig.registerModule('db');

angular.module('db').run([
    'DB',
    'UserService',
    function(DB,UserService){

              // Register the DB-Services

              var dbi = 0;

              for(dbi = 0; dbi < DB_SERVICES.length; dbi++)
                 {

                   if(angular.isUndefined(DB_SERVICES[dbi].name) === true ||
                      angular.isUndefined(DB_SERVICES[dbi].url)  === true)
                        {
                        continue;
                        }

                   if (window.LARAVEL.debug === true)
                        {
                        console.info('Register DB-Service: [Name ="' + DB_SERVICES[dbi].name + '", Url="' + DB_SERVICES[dbi].url + '"]');
                        }

                   DB.register(DB_SERVICES[dbi].name,DB_SERVICES[dbi].url,{
                       'except':DB_SERVICES[dbi].except !== undefined ? DB_SERVICES[dbi].except : [],
                       'custom':DB_SERVICES[dbi].custom !== undefined ? DB_SERVICES[dbi].custom : []
                   });

                 }

        }
    ]);
