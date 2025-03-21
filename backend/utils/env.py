import os
from dotenv import load_dotenv


class EnvLoader:
    def __init__(self, env_file=".env", override=False):
        self.env_file = env_file
        self.override = override
        self.load_env_files()

    def load_env_files(self):
        if load_dotenv(self.env_file, override=self.override):
            print(f"Loaded environment file: {self.env_file}")
        else:
            print(f"Warning: {self.env_file} does not exist or could not be loaded.")

    def get(self, key, default=None):
        return os.getenv(key, default)
