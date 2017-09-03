import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, NgModule, QueryList, ViewChildren } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { UserService } from "app/services/user.service";
import { User } from "app/utils/User";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
    @ViewChildren('barel', {read: ViewContainerRef}) barelContainers: QueryList<ViewContainerRef>;

    barelz: string[] = [];

    constructor(private compiler: Compiler, private http: Http, private userService: UserService) {}

    ngAfterViewInit() {
        this.userService.fetchUser().subscribe(
            (user: User) => {
                this.barelz = user.barelz;
                this.barelContainers.changes.subscribe(
                    changes => this.addBarelz(user.barelz)
                );
            }
        );
    }

    private addBarelz(barelz: any[]) {

        let components = [];

        for (let barel of barelz) {
            let template: string = barel.template;
            let styles: string[] = [barel.styles];

            @Component({template, styles})
            class TemplateComponent {}

            components.push(TemplateComponent);
        }

        @NgModule({declarations: components})
        class BarelzModule {}

        const mod = this.compiler.compileModuleAndAllComponentsSync(BarelzModule);

        let containers = this.barelContainers.toArray();

        for (let i = 0; i < barelz.length; i++) {
            let TemplateComponent = components[i];
            let barel = barelz[i];
            let container = containers[i];

            const factory = mod.componentFactories.find((comp) =>
                comp.componentType === TemplateComponent
            );

            let names = Object.keys(barel.functions);
            for (let name of names) {
                barel.properties[name] = new Function(barel.functions[name]);
            }

            const component = containers[i].createComponent(factory);
            Object.assign(component.instance, barel.properties);
        }
    }

}
