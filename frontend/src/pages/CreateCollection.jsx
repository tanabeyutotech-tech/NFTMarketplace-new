import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFactoryContract } from "../web3/factory";

export default function CreateCollection() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();

    if (!name || !symbol || !cover) {
      alert("Name, Symbol, and Cover are required");
      return;
    }

    try {
      setLoading(true);

      // connect to factory
      const factory = await getFactoryContract();

      // deploy new NFT collection
      const tx = await factory.createCollection(
        name,
        symbol,
        cover
      );

      await tx.wait();

      alert("Collection created on blockchain!");
      navigate("/collections");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl px-6 py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-cyan-300">
        Create New Collection
      </h1>

      <form
        onSubmit={handleCreate}
        className="p-6 space-y-5 rounded-3xl bg-gradient-to-br from-[#061f2f] to-[#020617]"
      >
        <div>
          <label className="block mb-1 text-slate-400">
            Collection Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 text-white outline-none rounded-xl bg-black/40"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-400">
            Symbol
          </label>
          <input
            required
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full p-3 text-white rounded-xl bg-black/40"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-slate-400">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 text-white outline-none rounded-xl bg-black/40"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-400">
            Cover Image URL
          </label>
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="w-full p-3 text-white outline-none rounded-xl bg-black/40"
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-3 font-semibold text-black rounded-xl bg-cyan-500 hover:bg-cyan-400"
        >
          {loading ? "Creating..." : "Create Collection"}
        </button>
      </form>
    </div>
  );
}