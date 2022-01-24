module.exports=function(sequelize, DataTypes){
    return sequelize.define('select_news', { 
    idx: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    }, 
    select_title: {
        type:DataTypes.STRING(250)
    },
    select_link: {
        type:DataTypes.STRING(250)
    }
    });
}