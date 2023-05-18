export class ObjectPropertyInfo
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    propertyName: string | null;

    propertyValue: any;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(propertyName: string | null, propertyValue: any)
    {
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
    }
}