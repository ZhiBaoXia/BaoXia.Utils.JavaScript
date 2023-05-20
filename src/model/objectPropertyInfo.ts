export class ObjectPropertyInfo
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    owner: any;

    propertyName: string | null;

    propertyValue: any;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        owner: any,
        propertyName: string | null,
         propertyValue: any)
    {
        this.owner = owner;
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
    }
}