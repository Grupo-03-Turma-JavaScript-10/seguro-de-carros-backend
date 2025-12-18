import { ApiProperty } from '@nestjs/swagger';

export class ClientLogin {
  @ApiProperty({ example: 'marcos@example.com' })
  email: string;

  @ApiProperty({ example: 'senha123' })
  senha: string;
}