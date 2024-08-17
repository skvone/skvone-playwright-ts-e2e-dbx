import { Api } from './api';
import * as https from 'https';
import { RequestOptions } from 'https';

interface DatabricksParams {
    id?: string;
    name?: string;
    tableType: string;
    status?: string;
}

const DATABRICKS_INSTANCE = 'your-databricks-instance-url';
const DATABRICKS_WAREHOUSE_ID = 'your-databricks-warehouse-id';
const TOKEN_DBX = 'your-databricks-token';

export class DatabricksApi extends Api {
    // Method to insert data into a table
    async insertData(params: DatabricksParams): Promise<void> {
        const data = this.prepareInsertData(params);  // Prepare data for insertion
        const options = this.getRequestOptions(data); // Get options for the request

        try {
            const responseBody = await this.sendRequest(options, data); // Send request and get response
            this.checkResponse(responseBody); // Check the success of the operation
        } catch (error) {
            console.error('[API] Error inserting data:', error);
            throw error;
        }
    }

    // Method to prepare data for insertion
    private prepareInsertData(params: DatabricksParams): string {
        // Formulate SQL query for data insertion
        return JSON.stringify({
            statement: this.createInsertStatement(params),
            warehouse_id: DATABRICKS_WAREHOUSE_ID
        });
    }

    // Method to create request options
    private getRequestOptions(data: string): RequestOptions {
        return {
            hostname: DATABRICKS_INSTANCE,
            path: '/api/2.0/sql/statements',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${TOKEN_DBX}`, // Use token for authorization
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };
    }

    // Method to send HTTP request and receive response
    private async sendRequest(options: RequestOptions, data: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let responseBody = '';

                res.on('data', (chunk) => (responseBody += chunk)); // Collect response parts
                res.on('end', () => resolve(responseBody)); // Return complete response
            });

            req.on('error', reject); // Handle request errors
            req.write(data); // Send data with the request
            req.end();
        });
    }

    // Method to check if the operation was successful
    private checkResponse(responseBody: string) {
        const responseObj = JSON.parse(responseBody);

        // Check that the response status is successful
        if (responseObj.status.state !== 'SUCCESSED') {
            throw new Error(`[API] Operation failed with status: ${responseObj.status.state}`);
        }
    }

    // Method to create SQL query for data insertion
    private createInsertStatement(params: DatabricksParams): string {
        return `
            INSERT INTO ${params.tableType}_table
            VALUES ('${params.id}', '${params.name}', '${params.status}')
        `;
    }

    // Method to clean up data from a table (delete records)
    async cleanupData(params: DatabricksParams): Promise<void> {
        const data = this.prepareDeleteData(params);
        const options = this.getRequestOptions(data);

        try {
            await this.sendRequest(options, data);
        } catch (error) {
            console.error('[API] Error cleaning up data:', error);
            throw error;
        }
    }

    // Method to prepare data for deletion
    private prepareDeleteData(params: DatabricksParams): string {
        return JSON.stringify({
            statement: this.createDeleteStatement(params),
            warehouse_id: DATABRICKS_WAREHOUSE_ID
        });
    }

    // Method to create SQL query for data deletion
    private createDeleteStatement(params: DatabricksParams): string {
        return `DELETE FROM ${params.tableType}_table WHERE id = '${params.id}'`;
    }
}
