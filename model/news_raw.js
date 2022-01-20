module.exports=function(sequelize, DataTypes){
    return sequelize.define('news_raw', { 
    idx: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    }, 
    news_title: {
        type:DataTypes.STRING(250)
    },
    news_link: {
        type:DataTypes.STRING(250)
    }
    });
}