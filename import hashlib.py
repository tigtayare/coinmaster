import hashlib
import tkinter as tk
from tkinter import ttk
import time

class MinerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Cryptocurrency Miner")
        self.create_widgets()

    def create_widgets(self):
        # Previous Hash Label and Entry
        ttk.Label(self.root, text="Previous Hash:").grid(column=0, row=0, padx=10, pady=5)
        self.prev_hash_var = tk.StringVar()
        ttk.Entry(self.root, textvariable=self.prev_hash_var, width=50).grid(column=1, row=0, padx=10, pady=5)
        
        # Data Label and Entry
        ttk.Label(self.root, text="Data:").grid(column=0, row=1, padx=10, pady=5)
        self.data_var = tk.StringVar()
        ttk.Entry(self.root, textvariable=self.data_var, width=50).grid(column=1, row=1, padx=10, pady=5)
        
        # Difficulty Label and Entry
        ttk.Label(self.root, text="Difficulty:").grid(column=0, row=2, padx=10, pady=5)
        self.difficulty_var = tk.IntVar()
        ttk.Entry(self.root, textvariable=self.difficulty_var, width=50).grid(column=1, row=2, padx=10, pady=5)
        
        # Start Button
        self.start_button = ttk.Button(self.root, text="Start Mining", command=self.start_mining)
        self.start_button.grid(column=0, row=3, columnspan=2, padx=10, pady=10)
        
        # Results Label
        self.results_text = tk.StringVar()
        ttk.Label(self.root, textvariable=self.results_text, wraplength=400).grid(column=0, row=4, columnspan=2, padx=10, pady=10)
    
    def mine_block(self, previous_hash, data, difficulty):
        prefix = '0' * difficulty
        nonce = 0
        while True:
            # Combine previous hash, data, and nonce to create a new hash
            text = str(previous_hash) + str(data) + str(nonce)
            new_hash = hashlib.sha256(text.encode()).hexdigest()
            # Check if the hash starts with the required number of zeros
            if new_hash.startswith(prefix):
                return new_hash, nonce
            nonce += 1

    def start_mining(self):
        prev_hash = self.prev_hash_var.get()
        data = self.data_var.get()
        difficulty = self.difficulty_var.get()
        
        if not prev_hash or not data or not difficulty:
            self.results_text.set("Please fill in all fields.")
            return
        
        self.results_text.set("Mining...")
        start_time = time.time()
        new_hash, nonce = self.mine_block(prev_hash, data, difficulty)
        end_time = time.time()
        
        results = (f"Block mined!\nNonce: {nonce}\nHash: {new_hash}\n"
                   f"Mining completed in {end_time - start_time:.2f} seconds.")
        self.results_text.set(results)

if __name__ == "__main__":
    root = tk.Tk()
    app = MinerApp(root)
    root.mainloop()
