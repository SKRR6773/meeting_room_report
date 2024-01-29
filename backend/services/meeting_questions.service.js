const { sequelize } = require('../models/config');
const meeting_questions_model = require('../models/meeting_questions.model');

const DiskStorage = require('../lib/Caching/Disk');
const CachingStorage = require('../lib/Caching/Caching');


const GetAllDiskStorage = new DiskStorage(); // GetAll

module.exports = new class {
    async GetAll(bindingData={})
    {
        const publicKey = "abc";
        const _result = GetAllDiskStorage.getWithKeys(publicKey);

        try
        {
            if (_result)
            {
                console.log("Load From Cache!");
                bindingData.value = _result;
            }
            else
            {
                const data = await meeting_questions_model.findAll({ raw: true });
    
                if (data)
                {
                    bindingData.value = data;
                }


                const GetAllCacheStorage = new CachingStorage();
                GetAllCacheStorage.setKeys(publicKey);
                GetAllCacheStorage.setValue(data);
                GetAllCacheStorage.setTimeoutValue(10 * 60 * 1000);

                GetAllDiskStorage.appendChild(GetAllCacheStorage);
                GetAllCacheStorage.run();
            }

            return true;
        }
        catch (err)
        {
            console.log("Meeting Questions GetAll Service Error -> ");
            console.error(err);


            return false;
        }
    }
};