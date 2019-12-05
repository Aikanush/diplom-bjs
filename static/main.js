class Profile {
	constructor({username, name: { firstName, lastName }, password}) {
	this.username = username;
	this.name = name;
	this.password = password;
  }

  performLogin(callback) {
  	console.log(`User ${this.username} is authorizing`);
        return ApiConnector.performLogin((err, data) => {
            console.log(`User ${this.username} authorized`);
            callback(err, data);
        });
  }

  createUser(callback) {
  	     console.log(`Adding new user ${this.username}`);
         return ApiConnector.createUser((err, data) => {
            console.log(`Added new user ${this.username}`);
            callback(err, data);
        });
     }

  addMoney({ currency, amount }, callback) {
        console.log(`Adding ${amount} of ${currency} to ${this.username}`);
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Added ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
      console.log(`Converting ${targetAmount} of ${fromCurrency} to ${targetAmount}`);
      return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
        console.log(`Converted ${targetAmount} of ${fromCurrency} to ${targetAmount}`);
        callback(err, data);
      });
    }

    transferMoney({ to, amount }, callback) {
      console.log(`Transfering ${amount} to ${to}`);
      return ApiConnector.trasferMoney( {to, amount}, (err, data) => {
        console.log(`Transfered ${amount} to ${to}`);
        callback(err, data);
      });
    }
}

 const getStocks = (callback) => {
  return ApiConnector.getStocks((err, data) => {
    console.log(`Запрос курсов валют с сервера`);
    callback(err, data);
  })
}

function main() {
    const Alex = new Profile({
                    username: 'alex',
                    name: { firstName: 'Alex', lastName: 'Alexeev' },
                    password: 'alex5555',
                });
    const Semen = new Profile({
                    username: 'semen',
                    name: { firstName: 'Semen', lastName: 'Bondarev' },
                    password: 'semen5555',
                });
    // сначала создаем и авторизуем пользователя
    Alex.createUser({
            username: 'alex',
            name: { firstName: 'Alex', lastName: 'Alexeev' },
            password: 'alex5555',
        }, (err, data) => {
        	if (err) {
        		console.error(`Error adding new user`);
        	} else {
        		console.log(`Added new user ${username}`);

        		Alex.performLogin({ username: 'alex', password: 'alex5555' }, (err, data) => {
    	           if (err) {
    		         console.error(`Error authorizing new user`);
    	           } else {
    		         console.log(`Authorized new user ${username}`);

    		          Alex.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
                         if (err) {
                           console.error(`Error during adding money to ${username}`);
                         } else {
                           console.log(`Added ${amount} ${currency} to ${username}`);

                           getStocks((err, data) => {
                           	 	if (err) {
                           	 		console.error(`Error getting stocks`);
                           	 	} else {
                           	 		console.log(`Got stocks`);
                           	 		console.log(data);

                           	 		// Alex.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'Netkoins', targetAmount: 100 }, (err, data) => {
                       

                               //     });
                           	 	}
                           	 });

                         }
    	            });
                }
        	});
         }
       });
}

           

main();



 

















