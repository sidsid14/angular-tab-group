import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.css'],
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent, { read: ElementRef })
  tabsRef!: QueryList<ElementRef>;
  tabs: { id: string; title: string; content: string; isActive: boolean }[] =
    [];
  activeContent: string = '';
  constructor() {}

  ngAfterContentInit(): void {
    this.tabsRef.map((f) => {
      const id = 'btn' + this.tabs.length;
      const title = f.nativeElement.getAttribute('title');
      const content = f.nativeElement.innerHTML.trim();
      const isActive = this.tabs.length === 0 ? true : false;
      if (isActive) {
        this.activeContent = content;
      }
      this.tabs.push({ id, title, content, isActive });
    });
  }

  activateTab(tab: {
    id: string;
    title: string;
    content: string;
    isActive: boolean;
  }) {
    if (!tab.isActive) {
      this.tabs.map((t) => {
        if (t.id !== tab.id) {
          t.isActive = false;
        } else {
          t.isActive = true;
        }
      });
      this.activeContent = tab.content;
    }
  }
}
