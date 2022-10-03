let myfunction=(function(){
    let name='';
    getName=function(){
        return name;
    }
    setName=function(newName){
        name=newName
    }
    return {
        getName:getName,
        setName:setName
    }
}());
myfunction.setName('alex');
console.log(myfunction.getName());
