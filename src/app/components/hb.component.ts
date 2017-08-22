import { Component, OnInit } from '@angular/core';
import { HbService } from '../services/hb.service';
import { Hb } from '../models/hb';
import 'rxjs/add/operator/catch';
@Component({
    selector: 'HbSelector',
    templateUrl: 'hb.component.html'
})

export class HbComponent implements OnInit {
    public hbs: Hb[] = [];
    public inEditMode: boolean = false;
    public currentHb: Hb;
    public buttonLabel: string = 'Create';

    constructor(private service: HbService) {
        this.currentHb = new Hb();
    }

    public remove(id: number): void {
        this.service.delete(id)
            .subscribe((res) => {
                if (res.success) {
                    this.loadTodos();
                }
                else {
                    console.error(res.errors);
                }
            });
    }

    public edit(hb: Hb): void {
        this.currentHb = hb;
        this.inEditMode = true;
        this.buttonLabel = 'Save';
    }

    public setOrUnsetCompleted(hb: Hb): void {
        hb.isComplete = !hb.isComplete;
        this.service.put(hb.id, hb)
            .subscribe((res) => {
                if (!res.success) {
                    console.error(res.errors);
                }
            });
    }

    public cancel(): void {
        this.currentHb = new Hb();
        this.inEditMode = false;
    }


    public save(): void {
        if (!this.inEditMode) {
            this.saveNewTodo();
        } else {
            this.updateTodo();
        }
    }

    private saveNewTodo(): void {
        this.service.post(this.currentHb)
            .subscribe((res) => {
                if (res.success) {
                    this.hbs.push(res.result);
                    this.currentHb = new Hb();
                    this.inEditMode = false;
                }
                else {
                    console.error(res.errors);
                }
            });
    }

    private updateTodo(): void {
        this.service.put(this.currentHb.id, this.currentHb)
            .subscribe((res) => {
                if (res.success) {
                    this.currentHb = new Hb();
                    this.inEditMode = false;
                    this.buttonLabel = 'Create';
                }
                else {
                    console.error(res.errors);
                }
            })
    }

    private loadTodos(): void {
        this.hbs = [];
        this.service.list()
            .subscribe((res) => {
                if (res.success) {
                    this.hbs = res.result;
                } else {
                    console.error(res.errors);
                }
            });
    }

    public ngOnInit() {
        this.loadTodos();
    }
}