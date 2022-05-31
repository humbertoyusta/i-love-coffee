import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

class Coffee {
    private _id : string;
    private _type : string;

	constructor(id: string, type: string) {
		this._id = id;
		this._type = type;
	}

    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Getter type
     * @return {string}
     */
	public get type(): string {
		return this._type;
	}

    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}

    /**
     * Setter type
     * @param {string} value
     */
	public set type(value: string) {
		this._type = value;
	}
    
}

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll () : string {
        return 'All coffees';
    }
    @Get(':id')
    findOne (@Param('id') id : string) : string {
        return `Coffee ${id}`;
    }
    @Post()
    create(@Body() body : Coffee) : string {
        return `creates a coffee, with id ${body.id}`;
    }
    @Delete(':id')
    delete(@Param('id') id : string,@Body() body : Coffee) : string {
        return `deletes the coffee with id ${id}`;
    }
    @Patch(':id')
    update(@Param('id') id : string, @Body() body : Coffee) : string {
        return `updates the coffee with id ${id}`;
    }
}
