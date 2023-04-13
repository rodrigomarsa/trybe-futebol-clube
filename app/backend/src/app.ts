import * as express from 'express';
import * as cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';
import teamsRouter from './routes/teamsRouter';
import userRouter from './routes/userRouter';
import matchesRouter from './routes/matchesRouter';
import leaderboardRouter from './routes/leaderboardRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors({
      origin: '*',
    }));
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public routes(): void {
    this.app.get('/internal-error', (_req, _res) => { throw new Error(); });
    this.app.use(teamsRouter);
    this.app.use(userRouter);
    this.app.use(matchesRouter);
    this.app.use(leaderboardRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
