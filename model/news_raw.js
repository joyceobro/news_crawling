module.exports=function(sequelize, DataTypes){
    return sequelize.define('news_raw', { 
    idx: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    }, 
    title: {
        type:DataTypes.STRING(250)
    },
    link: {
        type:DataTypes.STRING(250)
    }
    });
}