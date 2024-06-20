import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { AppService, Todo } from './app.service';

@Controller('todo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all')
  getAll(@Session() session, @Res() res) {
    session.todoList = session.todoList || [];

    try {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Successful!',
        data: session.todoList,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post('/create')
  createTodo(@Res() response, @Req() request, @Session() session): Todo[] {
    const requestBody = request.body;
    const { title = '' } = requestBody;
    const list = session.todoList || [];

    try {
      session.todoList = this.appService.createTodo({
        title,
        todoList: list,
      });

      return response.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Successful!',
        data: session.todoList,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Patch('/update/:todoId')
  updateTodo(
    @Res() response,
    @Req() request,
    @Param('todoId') todoId,
    @Session() session,
  ): Todo[] {
    const requestBody = request.body;
    const list = session.todoList || [];

    try {
      session.todoList = this.appService.updateTodo({
        id: todoId,
        data: requestBody,
        todoList: list,
      });

      return response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Successful!',
        data: session.todoList,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete('/delete/:todoId')
  deleteTodo(
    @Res() response,
    @Param('todoId') todoId,
    @Session() session,
  ): Todo[] {
    const list = session.todoList || [];

    try {
      session.todoList = this.appService.deleteTodo({
        id: todoId,
        todoList: list,
      });

      return response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Successful!',
        data: session.todoList,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
