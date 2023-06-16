<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('render_queries', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable(false);
            $table->json('box_coords')->nullable(false);
            $table->json('filters')->nullable(false);
            $table->string('status')->nullable(false)->default('registered');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('render_queries');
    }
};
