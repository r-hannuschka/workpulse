import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { JIRA_FLOW_WIDGET, type JiraFlowWidget } from '@jira-flow/common';
import { IssueSelectorService } from '../service/issue-selector.service';
import type { JiraIssueListItem } from '@timetracker/api';

@Component({
  selector: 'jiraflow-issue-selector-widget',
  templateUrl: './issue-selector-widget.component.html',
  imports: [MatAutocomplete, MatOption, MatAutocompleteTrigger],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './issue-selector-widget.component.scss',
  providers: [
    {
      provide: JIRA_FLOW_WIDGET,
      useExisting: IssueSelectorWidget,
    },
  ],
})
export class IssueSelectorWidget implements JiraFlowWidget {
  protected readonly issueSelectorService = inject(IssueSelectorService);

  readonly title = 'Issue Selektor';

  protected displayWithIssueKey(item: JiraIssueListItem): string {
    return `[${item.issueType}]: ${item.key}`;
  }

  protected onOptionSelected($event: MatAutocompleteSelectedEvent) {
    const selectedOption = $event.option as MatOption<JiraIssueListItem>;
    this.issueSelectorService.selectIssue(selectedOption.value);
    this.issueSelectorService.setFilter('');
  }

  refresh(): void {
    // noop
  }
}
