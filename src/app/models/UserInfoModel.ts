export class UserInfoModel
{
	guid: string;
	
	first_name: string;
	last_name: string;

	email: string;
	zipcode: string;

	password: string;

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
		// if(obj != null)
		// {
		// 	this.guid = obj.guid;
		// 	this.first_name = obj.first_name;
		// 	this.last_name = obj.last_name;
		// 	this.email = obj.email;
		// 	this.zipcode = obj.zipcode;
		// }
	}
}