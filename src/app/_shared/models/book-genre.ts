export class BookGenre {
    public name: string = "";
    isSelected: boolean
    constructor(name, isSelected) {
        this.name = name;
        this.isSelected = isSelected;
    }
}