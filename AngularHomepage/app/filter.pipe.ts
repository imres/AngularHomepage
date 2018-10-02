﻿import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        let result = items.filter(it => {
            if(it.firstName) {
                return it.firstName.toLowerCase().startsWith(searchText.toLowerCase())
                || it.lastName.toLowerCase().startsWith(searchText.toLowerCase())
                || (it.firstName.toLowerCase() + ' ' + it.lastName.toLowerCase()).startsWith(searchText.toLowerCase())
                || it.token == searchText;
            }
            if(it.PackageId) {
                return it.PackageId.toLowerCase() == searchText.toLowerCase();
            }
        });

        if(result.length === 0) {
            return [-1];
        }
        return result;
    }
}