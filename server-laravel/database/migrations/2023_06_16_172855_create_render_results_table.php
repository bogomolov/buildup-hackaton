<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\RenderQuery;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('render_results', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(RenderQuery::class)->nullable(false);
            $table->binary('model');
            $table->binary('preview');
            $table->string('comment')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('render_results');
    }
};
