import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookDTO } from 'app/_shared/dtos/book.dto';
import { MemberDTO } from 'app/_shared/dtos/member.dto';
import { Book } from 'app/_shared/models/book.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

    @Input("member-list")
    public members: MemberDTO[] = [];

    @Output()
    onDelete = new EventEmitter<MemberDTO>();

    @Output()
    onDetail = new EventEmitter<MemberDTO>();

    constructor() { }

    ngOnInit(): void {
    }


    ngOnChanges(changes) {
        // console.log(changes);
        
        // this.members = changes['bookList'].currentValue;
    }

    onDeleteClicked(event, memberDto: MemberDTO) {
        // let bookDTO = new BookDTO(book);
        this.onDelete.emit(memberDto);
    }

    onDetailClicked(event, memberDto: MemberDTO) {
        // let bookDTO = new BookDTO(book);
        this.onDetail.emit(memberDto);
    }
}
