class Notice{
    private _type: string;
	public get type():string{
		return this._type;
    }

    private _data: any;
    public get data(): any {
        return this._data;
    }
		
	public constructor(type:string, data:any = null){
        this._type = type;
        this._data = data;
    }

}
