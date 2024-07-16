import { Api } from './api';

export class ProjectApi extends Api {
  async createNewProject(projectName: string) {
    const response = await this.request.post('/projects', {
      data: {
        name: projectName,
      },
    });
    return response;
  }
}
